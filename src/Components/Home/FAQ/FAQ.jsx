import { Accordion, AccordionAction, AccordionContent, AccordionIcon, AccordionItem, AccordionTitle, } from 'keep-react'

const FAQ = () => {
    return (
        <section className="w-full py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    {/* YouTube Video Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="FAQ Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Accreditations Section */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Trusted & Accredited by
                        </h3>
                        <Accordion flush={true} type="single" collapsible>
                            <AccordionItem value="value-1">
                                <AccordionAction>
                                    <AccordionTitle>
                                        Working for dog adoption
                                    </AccordionTitle>
                                    <AccordionIcon />
                                </AccordionAction>
                                <AccordionContent>
                                    The best overall dog DNA test is embark breed & health Kit (view atths Chewy), which provides you with a breed brwn and ition on provides ancestors most dogs.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="value-2">
                                <AccordionAction>
                                    <AccordionTitle>
                                        Competitions & Awards
                                    </AccordionTitle>
                                    <AccordionIcon />
                                </AccordionAction>
                                <AccordionContent>
                                    The best overall dog DNA test is embark breed & health Kit (view atths Chewy), which provides you with a breed brwn and ition on provides ancestors most dogs.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="value-3">
                                <AccordionAction>
                                    <AccordionTitle>
                                        The puppies  are 3 mohths old
                                    </AccordionTitle>
                                    <AccordionIcon />
                                </AccordionAction>
                                <AccordionContent>
                                    The best overall dog DNA test is embark breed & health Kit (view atths Chewy), which provides you with a breed brwn and ition on provides ancestors most dogs.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
