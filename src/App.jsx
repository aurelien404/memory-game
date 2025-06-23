import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.subtitle")}</p>
    </>
  );
}

export default App;
