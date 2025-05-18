

function SignupInfo() {
    return (
        <section className="w-[448px] h-[695px] hidden lg:block rounded-bl-2xl rounded-tl-2xl relative overflow-hidden bg-gradient-to-br from-red-300 via-red-500 to-red-700 text-white py-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="relative container mx-auto px-6 lg:px-20">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-white"><img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="RizzPay Logo" />
                        </span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold">RizzPay</h1>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                    Start your financial journey with us
                </h2>
                <p className="max-w-xl mb-8 text-white">
                    Secure, fast, and convenient payments. Join thousands of users who trust PayBuddy for their financial needs.
                </p>

                {/* Feature List */}
                <ul className="space-y-4">
                    {[
                        'Fast and secure transactions',
                        'Low transaction fees',
                        '24/7 customer support',
                    ].map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                            <span className="text-lg">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default SignupInfo;