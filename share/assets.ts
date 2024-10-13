import { auth } from "@/app/firebase/config";
import { ASSETS_BASE_URL } from "./config";

export const IMAGES = {
  gigo: {
    src: `${ASSETS_BASE_URL}/GiGO..png`,
    width: 800, // specify the width
    height: 600, // specify the height
    priority: true,
  },
  authImage: {
    src: `${ASSETS_BASE_URL}/auth.png`,
    width: 800, // specify the width
    height: 600, // specify the height
    priority: true, // add this line to optimize LCP
  },
  landingImg: {
    src: `${ASSETS_BASE_URL}/landingimg.jpg`,
    width: 800, // specify the width
    height: 600, // specify the height
    priority: true, // add this line to optimize LCP
  },
  bigcard1img: {
    src: `${ASSETS_BASE_URL}/bigcard1.jpg`,
    width: 800, // specify the width
    height: 600, // specify the height
    priority: true, // add this line to optimize LCP
  },
  bigcard2img: {
    src: `${ASSETS_BASE_URL}/bigcard2.jpg`,
    width: 800, // specify the width
    height: 600, // specify the height
    priority: true, // add this line to optimize LCP
  },
  bigcard3img: {
    src: `${ASSETS_BASE_URL}/bigcard3.jpg`,
    width: 800, // specify the width
    height: 600, // specify the height
    priority: true, // add this line to optimize LCP
  },
};
// import {IMAGES} from "@/share/assets"
// IMAGES.logo
