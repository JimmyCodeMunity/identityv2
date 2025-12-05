import Logo from "@/constants";
import { useApi } from "@/context/ApiContext";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
    const {categories} = useApi()
  return (
    <>
      

<footer class="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-[#161E31]">
    <div class="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
        <a href="https://prebuiltui.com">
            <p className="text-2xl text-[#F8B179]">IdentityEA</p>
        </a>
        <div>
            <p class="text-slate-100 font-semibold">Product</p>
            <ul class="mt-2 space-y-2">
                <li><a href="/" class="hover:text-indigo-600 transition">Home</a></li>
                <li><a href="/about" class="hover:text-indigo-600 transition">About Us</a></li>
                <li><a href="/products" class="hover:text-indigo-600 transition">Shop Now</a></li>
            </ul>
        </div>
        <div>
            <p class="text-slate-100 font-semibold">Categories</p>
            <ul class="mt-2 space-y-2">
                {
                    categories?.map((cat)=>{
                        return(
                            <li><a 
                            key={cat._id}
                href={`/products?category=${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                            class="hover:text-indigo-600 transition">{cat?.name}</a></li>
                        )
                    })
                }
                
            </ul>
        </div>
        {/* <div>
            <p class="text-slate-100 font-semibold">Legal</p>
            <ul class="mt-2 space-y-2">
                <li><a href="/" class="hover:text-indigo-600 transition">Privacy</a></li>
                <li><a href="/" class="hover:text-indigo-600 transition">Terms</a></li>
            </ul>
        </div> */}
    </div>
    <div class="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
        <p class="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
        <div class="flex items-center gap-4 mt-3">
            <a href="https://www.tiktok.com/@identity.ea?_r=1&_t=ZM-91TDaZwAy3U" target="_blank" rel="noreferrer">
                <img src="../images/tiktok.svg" className="h-5 w-5" alt="" />
            </a>
            <a href="https://www.facebook.com/share/1Mdqp3Zonr/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
                 <FacebookIcon size={20} color="white"/>
            </a>
            <a href="https://www.instagram.com/identity.ea" target="_blank" rel="noreferrer">
                <InstagramIcon size={20} color="white"/>
            </a>
            <a href="https://x.com/identityea" target="_blank" rel="noreferrer">
                <TwitterIcon size={20} color="white"/>
            </a>
        </div>
        <p class="mt-3 text-center">© {new Date().getFullYear()} <a href="https://prebuiltui.com">IdentityEA</a></p>
    </div>
</footer>
    </>
  );
}
