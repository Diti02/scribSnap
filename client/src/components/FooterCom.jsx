import { Footer  } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs'

export const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-sky-600'>
      <div className="w-full max-w-7xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-sky-600 text-lg rounded-lg text-white'>Scrib</span>
              Snap
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title='ABOUT' />
              <Footer.LinkGroup col>
                <Footer.Link href='/' target='_blank' rel='noopener noreferrer'>
                  100 days of Coding
                </Footer.Link>
                <Footer.Link href='/' target='_blank' rel='noopener noreferrer'>
                  New Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='FOLLOW US' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Github
                </Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='LEGAL' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          
          </div>
          
        </div>
        <Footer.Divider/>
          <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright 
          href='#' 
          by="Diti's SnapScrib" 
          year={new Date().getFullYear()}/>
          
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}></Footer.Icon>
            <Footer.Icon href='#' icon={BsInstagram}></Footer.Icon>
            <Footer.Icon href='#' icon={BsTwitter}></Footer.Icon>
            <Footer.Icon href='#' icon={BsGithub}></Footer.Icon>
            <Footer.Icon href='#' icon={BsDribbble}></Footer.Icon>
          </div>
          </div>
        </div>
    
    </Footer>
  )
}
