import HeroVideoDialog from '@/Components/ui/hero-video-dialog';
import { Accordion, AccordionAction, AccordionContent, AccordionIcon, AccordionItem, AccordionTitle, } from 'keep-react'

const FAQ = () => {
    return (
        <section className="w-full py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    {/* YouTube Video Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative z-[5000]">
                            <HeroVideoDialog
                                className="dark:hidden block"
                                animationStyle="from-center"
                                videoSrc="https://www.youtube.com/embed/XdFfCPK5ycw?si=aZ8g_d07vlbeEsne"
                                thumbnailSrc="https://marketplace.canva.com/EADan-uE-ow/1/0/1600w/canva-puppy-training-tutorial-youtube-thumbnail-dPAgAz_5yB4.jpg"
                                thumbnailAlt="Hero Video"
                            />
                            <HeroVideoDialog
                                className="hidden dark:block"
                                animationStyle="from-center"
                                videoSrc="https://www.youtube.com/embed/XdFfCPK5ycw?si=aZ8g_d07vlbeEsne"
                                thumbnailSrc="https://d2v5dzhdg4zhx3.cloudfront.net/adminTemplate/3fa489b9e75d47638d02aabb5c0c355d.jpg"
                                thumbnailAlt="Hero Video"
                            />
                        </div>
                    </div>

                    {/* Accreditations Section */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
                        <div className='lg:ml-4 space-y-2'>
                            <h3 className="text-3xl font-semibold text-color-accent">
                                FAQ Question
                            </h3>
                            <h2 className='text-4xl font-semibold'>History & Family Adoption</h2>
                        </div>
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
