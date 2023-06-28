import headerLogo from '../images/Vector_1.svg';

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Россия"
      />
    </header>
  )
};

export default Header;