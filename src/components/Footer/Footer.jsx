import { WeatherWidget } from './components';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="font-semibold text-[18px]/5 pt-5">
        <div>Блог веб-разработчика</div>
        <div>web@developer.com</div>
      </div>
      <WeatherWidget />
    </footer>
  );
};
