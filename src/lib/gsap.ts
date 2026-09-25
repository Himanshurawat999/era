'use client';

// Always import GSAP from here, never from 'gsap' directly, so plugins register once.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  Draggable,
  InertiaPlugin,
  DrawSVGPlugin,
  CustomEase,
  useGSAP,
);
gsap.defaults({ ease: 'power3.out', duration: 1 });

export { gsap, ScrollTrigger, SplitText, Draggable, CustomEase, useGSAP };
