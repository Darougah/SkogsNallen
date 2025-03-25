import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4>KONTAKTINFORMATION</h4>
                    <p>
                        <span><i className="ri-map-pin-2-fill"></i></span>
                        19242 Stupvägen 75, Sollentuna, Sverige
                    </p>
                    <p>
                        <span><i className="ri-mail-fill"></i></span>
                        kontakt@skogsnallen.se
                    </p>
                    <p>
                        <span><i className="ri-phone-fill"></i></span>
                        (+46) 73-613 00 70
                    </p>
                </div>
                <div className='footer__col'>
                    <h4>OM SKOGSNALLEN</h4>
                    <a href="/">Hem</a>
                    <a href="/">Om Oss</a>
                    <a href="/">Jobba med oss</a>
                    <a href="/">Villkor & Regler</a>
                </div>
                <div className='footer__col'>
                    <h4>SUPPORT</h4>
                    <a href="/">Hjälp & Support</a>
                    <a href="/">Spåra din beställning</a>

                </div>
            </footer>
            <div className='footer__bar'>
                Upphovsrätt © 2025 av SkogsNallen. Alla rättigheter förbehållna.
            </div>
        </>
    );
};

export default Footer;
