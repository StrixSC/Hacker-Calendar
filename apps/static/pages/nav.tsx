export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand d-flex p-2" href="/">
                <div className="logo">
                    <img src="/assets/logo.svg" />
                </div>
                Hacker Calendar
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            Home <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="about">
                            About
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link"
                            href="ressources"
                            id="navbarDropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Ressources
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
