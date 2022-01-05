import Nav from './nav';
import Calendar from './calendar';

export function Index() {
    return (
        <>
            <Nav></Nav>
            <main className="full-container">
                <Calendar></Calendar>
            </main>
        </>
    );
}

export default Index;
