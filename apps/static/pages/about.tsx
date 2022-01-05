import Nav from './nav';

export default function About() {
    return (
        <>
            <Nav></Nav>
            <main className="d-flex justify-content-center container mt-5">
                <div className="jumbotron">
                    <h1 className="display-4">About</h1>
                    <p className="lead">
                        Hacker Calendar provides a Google Calendar around{' '}
                        <a href="https://clist.by">clist.by</a>, a phenomenal
                        ressource providing good and structured information to
                        help programmers and hackers with coordinating
                        competitions and events.
                    </p>
                    <hr className="my-4" />
                    <p>
                        Hacker Calendar also provides significant dates
                        regarding end of machine life for{' '}
                        <a href="https://hackthebox.eu">HackTheBox</a> machines,{' '}
                        <a href="https://tryhackme.com/">TryHackMe</a> machines
                        and more. In addition, this calendar can be exported to
                        different calendars.
                    </p>
                    <br />
                    <p className="lead">
                        <a
                            className="btn btn-primary btn-lg"
                            href="https://clist.by"
                            role="button"
                        >
                            Go to CLIST
                        </a>
                    </p>
                </div>
            </main>
        </>
    );
}
