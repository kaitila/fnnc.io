import { Card } from "@/components/Card";

import '@/app/globals.css';
import { Scrolling } from "@/components/Scrolling";
import { AboutCard } from "@/components/AboutCard";

export const ReadMore = () => {
    return (
        <section id="read-more" className="min-h-screen w-full pt-20">
            <div className="max-w-240 px-16 m-auto mt-4">
                <h1 className="mx-auto max-w-240 text-center text-5xl font-bold relative p-4 rounded-xl mb-8 bg-secondary bg-opacity-20
                    grow
                ">
                    About
                </h1>
                <AboutCard appear="left">
                    <h2 className="text-4xl font-bold mb-4">
                        Look up <span className="text-primary">all</span> stocks traded in <span className="text-primary">any</span> US exchange.
                    </h2>
                    <p className="text-light text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia sequi magnam non nostrum rerum saepe!</p>
                </AboutCard>            
                
                <Scrolling className="h-32"/>
                <AboutCard appear="right" align="end">
                    <h2 className="text-4xl font-bold mb-4">
                        Get access to <span className="text-primary">current</span> and <span className="text-primary">historical</span> financial data.
                    </h2>
                    <p className="text-light text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae corporis nihil facilis atque quia necessitatibus eligendi rerum libero natus doloremque ipsum vel, adipisci praesentium minima?</p>
                </AboutCard>
                        
                <Scrolling className="h-32"/>
                <AboutCard appear="left">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-primary">Save</span> interesting companies to your <span className="text-primary">watchlists</span>.
                    </h2>
                    <p className="text-light text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quo consequuntur aspernatur.</p>
                </AboutCard>
                <Scrolling className="h-32"/>
                <div className="w-full flex justify-center my-4">
                    <div>
                        <h2 className="text-4xl font-bold mb-4 appear-top">
                            <span className="text-primary">Share</span> your watchlists with the <span className="text-primary">world</span>.
                        </h2>
                        <p className="text-light text-lg appear-bottom">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, repudiandae?
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    );
}