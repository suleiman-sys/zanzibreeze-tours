import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {

  const { i18n } = useTranslation();

  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      defaultValue="en"
      className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-full outline-none backdrop-blur-xl"
    >

      <option value="en" className="bg-[#081120] text-white">
        🇬🇧 English
      </option>

      <option value="fr" className="bg-[#081120] text-white">
        🇫🇷 French
      </option>

      <option value="es" className="bg-[#081120] text-white">
        🇪🇸 Spanish
      </option>

      <option value="de" className="bg-[#081120] text-white">
        🇩🇪 German
      </option>

      <option value="it" className="bg-[#081120] text-white">
        🇮🇹 Italian
      </option>

      <option value="ar" className="bg-[#081120] text-white">
        🇸🇦 Arabic
      </option>

    </select>
  );
}