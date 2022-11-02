import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1><span className="nowrap">IK GOLDBANK</span></h1>
            </header>
            <main className="public__main">
                <p>Our future with gold.</p><br />
                <p>Powered by I.K. Group Ltd.</p>
                <address className="public__addr">
                    Office: <br />
                    I.K Jewellers Ltd.<br />
                    Amir Complex, <br /> 
                    Azampur, Uttara<br />
                    Dhaka, 1230<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
                <Link to="/calculator">Loan Calculator</Link>
            </footer>
        </section>

    )
    return content
}

export default Public
