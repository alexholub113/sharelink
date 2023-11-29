const Footer = () => {
    return (
        <footer className=" secondary-text-color text-center py-4">
            <div className="container mx-auto px-4">
                <p>© {new Date().getFullYear()} ShareLink. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;