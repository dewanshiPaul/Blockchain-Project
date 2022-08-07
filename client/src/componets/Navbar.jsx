import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

export function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className='w-full flex md:justify-center justify-between item-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center italic'>
                <p className='text-2xl md:text-base text-white font-medium pt-2.5 hover:font-bold cursor-pointer'>Eth-Share</p>
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {
                    ["Market","Exchange","Wallets"].map((item, ind) => (
                        <NavbarItem key={item + ind} title={item}/>
                    ))
                }
            </ul>
            <div className='flex relative'>
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                )}
                {
                    toggleMenu && (
                        <ul
                            className={`z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white ${toggleMenu ? "translate-x-0" : "translate-x-full"}`}
                        >
                            <li className='text-xl w-full my-2 cursor-pointer'>
                                <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                            </li>
                            <div className='mt-6 mr-4'>
                            {
                                ["Market","Exchange","Wallets"].map((item, ind) => (
                                    <NavbarItem key={item + ind} title={item} classProps='my-2 text-lg'/>
                                ))
                            }
                            </div>
                        </ul>
                    )
                } 
            </div>
        </nav>
    )
}