import { Logo, Description, ControlPanel } from './components';

export const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Description>
        Веб-технологии
        <br />
        Написание кода
        <br />
        Разбор ошибок
      </Description>
      <ControlPanel />
    </header>
  );
};
