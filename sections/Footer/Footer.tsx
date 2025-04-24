"use client";

import IpadCursorBlockWrapper from "@/components/IpadCursorWrapper/IpadCursorWrapper";
import React from "react";
import {
    IconLayoutCards,
    IconBrandLinkedin,
    IconBrandGithub,
    IconUserScan,
} from "@tabler/icons-react";
import Image from "next/image";

function Footer() {
    function openLinkedin() {
        window.open(
            "https://www.linkedin.com/in/kevin-bueno-0a8809218/",
            "_blank"
        );
    }

    function openGithub() {
        window.open("https://github.com/Kbueno1077", "_blank");
    }

    function openWebsite() {
        window.open("https://www.kbueno-studio.com/", "_blank");
    }

    return (
        <>
            <footer className="footer footer-center bg-primary/80 text-primary-content mt-20 p-10">
                <aside>
                    <div className="w-[200px] h-[200px]">
                        <Image
                            src="/logo.png"
                            alt=""
                            width={1024}
                            height={1024}
                            quality={100}
                            className="rounded-box object-cover object-center"
                        />
                    </div>
                    <IpadCursorBlockWrapper type="text">
                        <p className="font-bold">
                            Kevin Bueno Studios.
                            <br />
                            Providing reliable tech since 2016
                        </p>{" "}
                    </IpadCursorBlockWrapper>
                    <IpadCursorBlockWrapper type="text">
                        <p>
                            Copyright © {new Date().getFullYear()} - All right
                            reserved 🤣
                        </p>
                    </IpadCursorBlockWrapper>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <IpadCursorBlockWrapper>
                            <button
                                className="btn btn-square rounded-md btn-sm"
                                onClick={openLinkedin}
                            >
                                <IconBrandLinkedin size={24} />
                            </button>
                        </IpadCursorBlockWrapper>

                        <IpadCursorBlockWrapper>
                            <button
                                className="btn btn-square rounded-md btn-sm"
                                onClick={openGithub}
                            >
                                <IconBrandGithub size={24} />
                            </button>
                        </IpadCursorBlockWrapper>

                        <IpadCursorBlockWrapper>
                            <button
                                className="btn btn-square rounded-md btn-sm"
                                onClick={openWebsite}
                            >
                                <IconUserScan size={24} />
                            </button>
                        </IpadCursorBlockWrapper>
                    </div>
                </nav>
            </footer>
        </>
    );
}

export default Footer;
