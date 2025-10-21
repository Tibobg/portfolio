// components/HeaderOverlay.tsx
"use client";
import StarBorder from "@/components/StarBorder";
import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";

export default function HeaderOverlay() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="pointer-events-auto">
            <Link href="#accueil" className="inline-flex items-center gap-3">
              <Image
                src="/signature/image.png"
                alt="Signature"
                width={140}
                height={40}
                priority
                className="h-8 w-auto md:h-10 object-contain drop-shadow"
              />
            </Link>
          </div>

          {/* Actions */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {/* CV */}
            <Link href="/signature/ThibaultCauche.pdf" target="_blank">
              <button
                className="btn-cv btn-cv--sweep"
                title="Curriculum vitae"
                aria-label="Ouvrir le CV"
              >
                {/* <1450px : 'CV' / ≥1450px : 'Curriculum vitae' */}
                <span className="block min-[1450px]:hidden">CV</span>
                <span className="hidden min-[1450px]:block">Curriculum vitae</span>
              </button>
            </Link>

            {/* Me contacter */}
            {/* <1450px : bouton icône */}
            <Link href="#contact" className="min-[1450px]:hidden" title="Me contacter" aria-label="Me contacter">
              <button
                className="h-[38px] w-[38px] rounded-full bg-white text-[#FF4FCA] shadow-md border border-white/60
                           flex items-center justify-center hover:shadow-lg hover:bg-white/90 transition"
              >
                <Send className="h-5 w-5" />
              </button>
            </Link>

            {/* ≥1450px : StarBorder */}
            <Link href="#contact" className="hidden min-[1450px]:block">
              <StarBorder as="span" color="#FF4FCA" speed="3s" thickness={8} className="select-none" data-label="Me contacter">
                Me contacter
              </StarBorder>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
