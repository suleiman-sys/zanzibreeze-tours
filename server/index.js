const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const heroRoutes = require("./routes/heroRoutes");

const jwt = require("jsonwebtoken");
const helmet = require("helmet");

const rateLimit =
  require("express-rate-limit");

const verifyAdmin = require(
  "./middleware/authMiddleware"
);

const db = require("./db");

const app = express();



const JWT_SECRET =
  process.env.JWT_SECRET;
/* SECURITY */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);



/* RATE LIMIT */

const limiter = rateLimit({

  windowMs:
    15 * 60 * 1000,

  max: 300,

  message:
    "Too many requests, please try again later.",

});

app.use(limiter);

/* EMAIL TRANSPORTER */

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,

  },

});

/* IMAGE STORAGE */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads");

  },

  filename: (req, file, cb) => {

    cb(

      null,

      Date.now() +
      path.extname(file.originalname)

    );

  },

});

const upload = multer({ storage });

/* STATIC UPLOADS */

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

/* CORS */



app.use(

  cors({

    origin:
      "http://localhost:5173",

    credentials: true,

  })

);


app.use(express.json());

app.use(

  cors({

    origin:
      "http://localhost:5173",

    credentials: true,

  })

);

app.use(express.json());

app.use("/api/hero", heroRoutes);

/* TEST ROUTE */

app.get("/", (req, res) => {

  res.send("Backend Running...");

});

/* IMAGE UPLOAD API */

app.post(
  "/api/upload",
  upload.single("image"),

  (req, res) => {

    if (!req.file) {

      return res.status(400).json({
        error: "No file uploaded",
      });

    }

    res.json({

      imageUrl:

      `${process.env.SERVER_URL}/uploads/${req.file.filename}`,

    });

  }

);

/* CREATE BOOKING */

app.post("/api/bookings", (req, res) => {

  const {

    fullName,
    email,
    phone,
    tour,
    travelDate,
    guests,
    message,
    price,

  } = req.body;

  const sql = `

    INSERT INTO bookings
    (fullName, email, phone, tour, travelDate, guests, message, price)

    VALUES (?, ?, ?, ?, ?, ?, ?, ?)

  `;

  db.query(

    sql,

    [

      fullName,
      email,
      phone,
      tour,
      travelDate,
      guests,
      message,
      price,

    ],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          error: "Booking failed",
        });

      } else {

    /* SEND EMAIL */

const mailOptions = {

  from: process.env.EMAIL_USER,

  to: process.env.EMAIL_USER,

  subject: "New Tour Booking",

  html: `

    <h2>New Booking Received</h2>

    <p><strong>Name:</strong> ${fullName}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Phone:</strong> ${phone}</p>

    <p><strong>Tour:</strong> ${tour}</p>

    <p><strong>Date:</strong> ${travelDate}</p>

    <p><strong>Guests:</strong> ${guests}</p>

    <p><strong>Message:</strong> ${message}</p>

  `,

};

transporter.sendMail(

  mailOptions,

  (error, info) => {

    if (error) {

      console.log(error);

    } else {

      console.log(
        "Email sent: " + info.response
      );

    }

  }

);

        res.json({
          message: "Booking successful",
        });

      }

    }

  );

});

/* GET ALL BOOKINGS */

app.get("/api/bookings", verifyAdmin, (req, res) => {

  const sql = "SELECT * FROM bookings ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch bookings",
      });

    } else {

      res.json(result);

    }

  });

});

/* DELETE BOOKING */

app.delete("/api/bookings/:id", verifyAdmin, (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to delete booking",
      });

    } else {

      res.json({
        message: "Booking deleted successfully",
      });

    }

  });

});

/* UPDATE BOOKING STATUS */

app.put("/api/bookings/:id/status", verifyAdmin, (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  const sql = `

    UPDATE bookings
    SET status = ?
    WHERE id = ?

  `;

  db.query(sql, [status, id], (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to update status",
      });

    } else {

      res.json({
        message: "Status updated successfully",
      });

    }

  });

});

/* UPDATE BOOKING */

app.put("/api/bookings/:id", verifyAdmin, (req, res) => {

  const { id } = req.params;

  const {

    fullName,
    email,
    phone,
    travelDate,
    guests,
    message,
    price,

  } = req.body;

  const sql = `

    UPDATE bookings

    SET

      fullName = ?,
      email = ?,
      phone = ?,
      travelDate = ?,
      guests = ?,
      message = ?

    WHERE id = ?

  `;

  db.query(

    sql,

    [

      fullName,
      email,
      phone,
      travelDate,
      guests,
      message,
      id,

    ],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          error: "Failed to update booking",
        });

      } else {

        res.json({
          message: "Booking updated successfully",
        });

      }

    }

  );

});

/* CREATE CONTACT */

app.post("/api/contacts", (req, res) => {

  const {

    fullName,
    email,
    subject,
    message,

  } = req.body;

  const sql = `

   INSERT INTO contacts
(fullName, email, subject, message, status)

    VALUES (?, ?, ?, ?, ?)

  `;

  db.query(

    sql,

    [

      fullName,
      email,
      subject,
      message,
      "unread"
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          error: "Message failed",
        });

      } else {

        res.json({
          message: "Message sent successfully",
        });

      }

    }

  );

});

/* UPDATE CATEGORY */

app.put(

  "/api/categories/:id",

  verifyAdmin,

  (req, res) => {

    const {
      name,
      slug,
    } = req.body;

    const sql = `
      UPDATE categories
      SET
      name = ?,
      slug = ?
      WHERE id = ?
    `;

    db.query(

      sql,

      [
        name,
        slug,
        req.params.id,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Category updated successfully",

        });

      }

    );

  }

);

/* GET CONTACTS */

app.get("/api/contacts", verifyAdmin, (req, res) => {

  const sql = "SELECT * FROM contacts ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch contacts",
      });

    } else {

      res.json(result);

    }

  });

});

/* DELETE CONTACT */

app.delete("/api/contacts/:id", verifyAdmin, (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to delete message",
      });

    } else {

      res.json({
        message: "Message deleted successfully",
      });

    }

  });

});

/* CREATE TOUR */

app.post("/api/tours", (req, res) => {

  const {

  title,
  slug,
  category,
  section,
  image,
  price,
  duration,
  rating,
  location,
  description,
  highlights,
  included,
  itinerary,

} = req.body;

  const sql = `

   INSERT INTO tours
(
  title,
  slug,
  category,
  section,
  image,
  price,
  duration,
  rating,
  location,
  description,
  highlights,
  included,
  itinerary
)

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

  `;

  db.query(

    sql,

   [

  title,
  slug,
  category,
  section,
  image,
  price,
  duration,
  rating,
  location,
  description,
  highlights,
  included,
  itinerary,

],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          error: "Failed to create tour",
        });

      } else {

        res.json({
          message: "Tour created successfully",
        });

      }

    }

  );

});

/* GET ALL TOURS */

app.get("/api/tours", (req, res) => {

  const sql =
    "SELECT * FROM tours ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch tours",
      });

    } else {

      res.json(result);

    }

  });

});

/* DELETE TOUR */

app.delete("/api/tours/:id", verifyAdmin, (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM tours WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to delete tour",
      });

    } else {

      res.json({
        message: "Tour deleted successfully",
      });

    }

  });

});

/* UPDATE TOUR */
app.put("/api/tours/:id", verifyAdmin, (req, res) => {

  const { id } = req.params;

  const {

  title,
  slug,
  category,
  section,
  image,
  price,
  duration,
  rating,
  location,
  description,
  highlights,
  included,
  itinerary,

} = req.body;

 const sql = `

  UPDATE tours

  SET
    title = ?,
    slug = ?,
    category = ?,
    section = ?,
    image = ?,
    price = ?,
    duration = ?,
    rating = ?,
    location = ?,
    description = ?,
    highlights = ?,
    included = ?,
    itinerary = ?

  WHERE id = ?

`;
  db.query(

    sql,

    [

      title,
      slug,
      category,
      section,
      image,
      price,
      duration,
      rating,
      location,
      description,
      highlights,
      included,
      itinerary,
      id,

    ],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          error: "Failed to update tour",
        });

      } else {

        res.json({
          message: "Tour updated successfully",
        });

      }

    }

  );

});

/* GET SITE CONTENT */

app.get("/api/content", (req, res) => {

  const sql =
    "SELECT * FROM site_content";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch content",
      });

    } else {

      res.json(result);

    }

  });

});

/* UPDATE SITE CONTENT */

app.put("/api/content/:id", verifyAdmin, (req, res) => {

  const { id } = req.params;

  const {

  title,
  subtitle,
  description,
  button_text,
  button_link,
  image,

} = req.body;

  const sql = `

    UPDATE site_content

    SET

      title = ?,
      subtitle = ?,
      description = ?,
      button_text = ?,
      button_link = ?,
      image = ?

    WHERE id = ?

  `;

  db.query(

    sql,

    [

      title,
      subtitle,
      description,
      button_text,
      button_link,
      image,
      id,

    ],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json({
          error: "Failed to update content",
        });

      } else {

        res.json({
          message: "Content updated successfully",
        });

      }

    }

  );

});

/* DASHBOARD ANALYTICS */

app.get("/api/dashboard", (req, res) => {

  const analytics = {};

  /* TOTAL BOOKINGS */

  db.query(

    "SELECT COUNT(*) AS totalBookings FROM bookings",

    (err, bookingsResult) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          error: "Analytics failed",
        });

      }

      analytics.totalBookings =
        bookingsResult[0].totalBookings;

      /* TOTAL CONTACTS */

      db.query(

        "SELECT COUNT(*) AS totalContacts FROM contacts",

        (err, contactsResult) => {

          if (err) {

            console.log(err);

            return res.status(500).json({
              error: "Analytics failed",
            });

          }

          analytics.totalContacts =
            contactsResult[0].totalContacts;

          /* TOTAL TOURS */

          db.query(

            "SELECT COUNT(*) AS totalTours FROM tours",

            (err, toursResult) => {

              if (err) {

                console.log(err);

                return res.status(500).json({
                  error: "Analytics failed",
                });

              }

              analytics.totalTours =
                toursResult[0].totalTours;

              /* RECENT BOOKINGS */

              db.query(

                `

                SELECT *

                FROM bookings

                ORDER BY id DESC

                LIMIT 5

                `,

                (err, recentBookings) => {

                  if (err) {

                    console.log(err);

                    return res.status(500).json({
                      error: "Analytics failed",
                    });

                  }

                  analytics.recentBookings =
                    recentBookings;

                  res.json(analytics);

                }

              );

            }

          );

        }

      );

    }

  );

});

/* =========================
   CATEGORIES APIs
========================= */

/* GET ALL CATEGORIES */

app.get(

  "/api/categories",

  (req, res) => {

    const sql =
      "SELECT * FROM categories ORDER BY id DESC";

    db.query(

      sql,

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json(result);

      }

    );

  }

);

/* CREATE CATEGORY */

app.post(

  "/api/categories",

  verifyAdmin,

  (req, res) => {

    const {
      name,
      slug,
    } = req.body;

    const sql = `
      INSERT INTO categories
      (name, slug)
      VALUES (?, ?)
    `;

    db.query(

      sql,

      [
        name,
        slug,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Category created successfully",

        });

      }

    );

  }

);

/* DELETE CATEGORY */

app.delete(

  "/api/categories/:id",

  verifyAdmin,

  (req, res) => {

    const sql =
      "DELETE FROM categories WHERE id = ?";

    db.query(

      sql,

      [req.params.id],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Category deleted successfully",

        });

      }

    );

  }

);

/* ADMIN REGISTER */

app.post("/api/admin/register", async (req, res) => {

  try {

    const {

      email,
      password,

    } = req.body;

    /* HASH PASSWORD */

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql = `

      INSERT INTO admins
      (email, password)

      VALUES (?, ?)

    `;

    db.query(

      sql,

      [

        email,
        hashedPassword,

      ],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            error: "Admin registration failed",
          });

        }

        res.json({
          message: "Admin registered successfully",
        });

      }

    );

  } catch (error) {

    console.log(error);

  }

});

/* ADMIN LOGIN */

app.post("/api/admin/login", (req, res) => {

  const {

    email,
    password,

  } = req.body;

  const sql = `

    SELECT *
    FROM admins
    WHERE email = ?

  `;

  db.query(

    sql,

    [email],

    async (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          error: "Login failed",
        });

      }

      if (result.length === 0) {

        return res.status(401).json({
          error: "Invalid email or password",
        });

      }

      const admin = result[0];

      const validPassword =
        await bcrypt.compare(

          password,
          admin.password

        );

      if (!validPassword) {

        return res.status(401).json({
          error: "Invalid email or password",
        });

      }

      /* CREATE TOKEN */

      const token = jwt.sign(

        {

          adminId: admin.id,
          email: admin.email,

        },

        JWT_SECRET,

        {

          expiresIn: "7d",

        }

      );

      res.json({

        token,

        admin: {

          id: admin.id,
          email: admin.email,

        },

      });

    }

  );

});

/* =========================
   DESTINATIONS APIs
========================= */

/* GET DESTINATIONS */

app.get(

  "/api/destinations",

  (req, res) => {

    const sql =
      "SELECT * FROM destinations ORDER BY id DESC";

    db.query(

      sql,

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json(result);

      }

    );

  }

);

/* CREATE DESTINATION */

app.post(

  "/api/destinations",

  verifyAdmin,

  (req, res) => {

    const {
      title,
      slug,
      image,
      description,
    } = req.body;

    const sql = `
      INSERT INTO destinations
      (
        title,
        slug,
        image,
        description
      )
      VALUES (?, ?, ?, ?)
    `;

    db.query(

      sql,

      [
        title,
        slug,
        image,
        description,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Destination created successfully",

        });

      }

    );

  }

);

/* UPDATE DESTINATION */

app.put(

  "/api/destinations/:id",

  verifyAdmin,

  (req, res) => {

    const {
      title,
      slug,
      image,
      description,
    } = req.body;

    const sql = `
      UPDATE destinations
      SET
      title = ?,
      slug = ?,
      image = ?,
      description = ?
      WHERE id = ?
    `;

    db.query(

      sql,

      [
        title,
        slug,
        image,
        description,
        req.params.id,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Destination updated successfully",

        });

      }

    );

  }

);

/* DELETE DESTINATION */

app.delete(

  "/api/destinations/:id",

  verifyAdmin,

  (req, res) => {

    const sql =
      "DELETE FROM destinations WHERE id = ?";

    db.query(

      sql,

      [req.params.id],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Destination deleted successfully",

        });

      }

    );

  }

);

/* =========================
   GALLERY APIs
========================= */

/* GET GALLERY */

app.get(

  "/api/gallery",

  (req, res) => {

    const sql =
      "SELECT * FROM gallery ORDER BY id DESC";

    db.query(

      sql,

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json(result);

      }

    );

  }

);

/* CREATE GALLERY */

app.post(

  "/api/gallery",

  verifyAdmin,

  (req, res) => {

    const {
      title,
      image,
    } = req.body;

    const sql = `
      INSERT INTO gallery
      (
        title,
        image
      )
      VALUES (?, ?)
    `;

    db.query(

      sql,

      [
        title,
        image,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Gallery image created successfully",

        });

      }

    );

  }

);

/* UPDATE GALLERY */

app.put(

  "/api/gallery/:id",

  verifyAdmin,

  (req, res) => {

    const {
      title,
      image,
    } = req.body;

    const sql = `
      UPDATE gallery
      SET
      title = ?,
      image = ?
      WHERE id = ?
    `;

    db.query(

      sql,

      [
        title,
        image,
        req.params.id,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Gallery updated successfully",

        });

      }

    );

  }

);

/* DELETE GALLERY */

app.delete(

  "/api/gallery/:id",

  verifyAdmin,

  (req, res) => {

    const sql =
      "DELETE FROM gallery WHERE id = ?";

    db.query(

      sql,

      [req.params.id],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);

        }

        res.json({

          message:
            "Gallery deleted successfully",

        });

      }

    );

  }

);

/* BUSINESS DASHBOARD ANALYTICS */
/* BUSINESS DASHBOARD ANALYTICS */

app.get(
  "/api/business-analytics",
  verifyAdmin,
  async (req, res) => {

    try {

      const bookingsSql =
        "SELECT COUNT(*) AS totalBookings FROM bookings";

      const toursSql =
        "SELECT COUNT(*) AS totalTours FROM tours";

      const contactsSql =
        "SELECT COUNT(*) AS totalContacts FROM contacts";

      const pendingSql = `

        SELECT COUNT(*) AS pendingBookings

        FROM bookings

        WHERE status = 'pending'

      `;

      const confirmedSql = `

        SELECT COUNT(*) AS confirmedBookings

        FROM bookings

        WHERE status = 'confirmed'

      `;

      const incomeSql = `

        SELECT SUM(price) AS totalIncome

        FROM bookings

        WHERE status = 'confirmed'

      `;

      const expensesSql = `

        SELECT SUM(amount) AS totalExpenses

        FROM expenses

      `;

      const recentCustomersSql = `

        SELECT
          fullName,
          email,
          price

        FROM bookings

        WHERE status = 'confirmed'

        ORDER BY id DESC

        LIMIT 5

      `;

      const expenseCategoriesSql = `

  SELECT
    category,
    SUM(amount) AS total

  FROM expenses

  GROUP BY category

`;

      db.query(bookingsSql, (err1, bookings) => {

        if (err1) {

          console.log(err1);

          return res.status(500).json({
            error: "Bookings query failed",
          });

        }

        db.query(toursSql, (err2, tours) => {

          if (err2) {

            console.log(err2);

            return res.status(500).json({
              error: "Tours query failed",
            });

          }

          db.query(contactsSql, (err3, contacts) => {

            if (err3) {

              console.log(err3);

              return res.status(500).json({
                error: "Contacts query failed",
              });

            }

            db.query(pendingSql, (err4, pending) => {

              if (err4) {

                console.log(err4);

                return res.status(500).json({
                  error: "Pending query failed",
                });

              }

              db.query(

                confirmedSql,

                (err5, confirmed) => {

                  if (err5) {

                    console.log(err5);

                    return res.status(500).json({
                      error:
                        "Confirmed query failed",
                    });

                  }

                  db.query(

                    incomeSql,

                    (err6, income) => {

                      if (err6) {

                        console.log(err6);

                        return res.status(500).json({
                          error: "Income query failed",
                        });

                      }

                      db.query(

                        expensesSql,

                        (err7, expenses) => {

                          if (err7) {

                            console.log(err7);

                            return res.status(500).json({
                              error:
                                "Expenses query failed",
                            });

                          }

                          db.query(

                            recentCustomersSql,

                            (err8, customers) => {

                              if (err8) {

                                console.log(err8);

                                return res.status(500).json({
                                  error:
                                    "Customers query failed",
                                });

                              }

                              db.query(

  expenseCategoriesSql,

  (err9, categories) => {

    if (err9) {

      console.log(err9);

      return res.status(500).json({
        error:
          "Expense categories failed",
      });

      

    }

                              const totalIncome =
                                income[0].totalIncome || 0;

                              const totalExpenses =
                                expenses[0].totalExpenses || 0;

                              const netProfit =
                                totalIncome - totalExpenses;

                              res.json({

                                totalBookings:
                                  bookings[0].totalBookings,

                                totalTours:
                                  tours[0].totalTours,

                                totalContacts:
                                  contacts[0].totalContacts,

                                pendingBookings:
                                  pending[0].pendingBookings,

                                confirmedBookings:
                                  confirmed[0]
                                    .confirmedBookings,

                                totalIncome,

                                totalExpenses,

                                netProfit,

                                recentCustomers:
                                  customers,

                                expenseCategories:
                                  categories,

                              });

                            }

                          );

                        }

                      );

                    }

                  );

                }

              );

            });

          });

        });

      });

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: "Server error",
      });

    }

  }

);
/* CREATE EXPENSE */

app.post(
  "/api/expenses",
  verifyAdmin,
  (req, res) => {

    const {

      title,
      amount,
      category,
      expense_date,
      notes,

    } = req.body;

    const sql = `

      INSERT INTO expenses
      (
        title,
        amount,
        category,
        expense_date,
        notes
      )

      VALUES (?, ?, ?, ?, ?)

    `;

    db.query(

      sql,

      [

        title,
        amount,
        category,
        expense_date,
        notes,

      ],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            error:
              "Failed to create expense",
          });

        }

        res.json({
          message:
            "Expense added successfully",
        });

      }

    );

  }
);

/* GET EXPENSES */

app.get(
  "/api/expenses",
  verifyAdmin,
  (req, res) => {

    const sql = `

      SELECT *
      FROM expenses
      ORDER BY id DESC

    `;

    db.query(sql, (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          error:
            "Failed to fetch expenses",
        });

      }

      res.json(result);

    });

  }
);

/* DELETE EXPENSE */

app.delete(
  "/api/expenses/:id",
  verifyAdmin,
  (req, res) => {

    const { id } = req.params;

    const sql =
      "DELETE FROM expenses WHERE id = ?";

    db.query(

      sql,

      [id],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            error:
              "Failed to delete expense",
          });

        }

        res.json({
          message:
            "Expense deleted successfully",
        });

      }

    );

  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});

