import { useNavigate } from "react-router-dom";

const CallToAction = () => {
    const navigate = useNavigate()

    return (
        <section className="my-16 w-11/12 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Call to action</h2>

            <div className="flex flex-col-reverse gap-8 lg:flex-row items-center dark:bg-dark-lite bg-white p-10 rounded-lg">
                <div className="flex-1 space-y-3">
                    <h1 className="font-bold text-4xl mb-4">
                        Working For Dog
                        <span className="relative inline-block mx-2 text-white">
                            <span className="absolute inset-0 bg-color-accent clip-trapezoid"></span>
                            <span className="relative px-4 py-1">Adoption</span>
                        </span>
                        Free, Happy Time
                    </h1>
                    <p className="text-lg"> Adopting a pet is one of the most rewarding experiences you can have. Help us give these lovely companions a second chance at a better life.</p>
                    <button
                        onClick={() => navigate('/pet-listing')}
                        className='bg-color-accent p-3 px-4 text-lg font-medium'>Adoption</button>
                </div>
                <div className="flex-1">
                    <img className="rounded-md" src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="cat" />
                </div>
            </div>
        </section>
    );
};

export default CallToAction;