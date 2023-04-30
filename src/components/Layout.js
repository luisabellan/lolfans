import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from "next/image";
import PropTypes from 'prop-types';
import AuthModal from './AuthModal';
import tw, { styled } from "twin.macro";
import { Menu, Transition } from '@headlessui/react';
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useSession, signOut } from 'next-auth/react';


const menuItems = [
  {
    label: 'List a new game',
    icon: PlusIcon,
    href: '/list',
  },
  {
    label: 'My games',
    icon: HomeIcon,
    href: '/games',
  },
  {
    label: 'Favorites',
    icon: HeartIcon,
    href: '/favorites',
  },
  {
    label: 'Logout',
    icon: LogoutIcon,
    onClick: signOut,
  },
];

const Layout = ({ children = null }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === 'loading';

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return <>
    <Head>
      <title>LolFans</title>
      <meta
        name="title"
        content="League of Legends Fan Site"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div tw="min-h-screen flex flex-col">
      <header tw="h-16 w-full shadow-md">
        <div tw="h-full container mx-auto">
          <div tw="h-full px-4 flex justify-between items-center space-x-4">
            <Link href="/" tw="flex items-center space-x-1">

              <SparklesIcon tw="flex-shrink-0 w-8 h-8 text-red-500" />
              <span tw="text-xl font-semibold tracking-wide">
                LolFans
              </span>

            </Link>
            <div tw="flex items-center space-x-4">
              <Link
                href="/create"
                tw="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md">
                
                  List your game
                
              </Link>
              {isLoadingUser ? (
                <div tw="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
              ) : user ? (
                <Menu as="div" tw="relative z-50">
                  <Menu.Button tw="flex items-center space-x-px" className="group">
                    <div tw="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                      {user?.image ? (
                        <Image src={user?.image} alt={user?.name || 'Avatar'} fill sizes="100vw" />
                      ) : (
                        <UserIcon tw="text-gray-400 w-6 h-6" />
                      )}
                    </div>
                    <ChevronDownIcon tw="w-5 h-5 flex-shrink-0 text-gray-500 group-hover:text-current" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items tw="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none">
                      <div tw="flex items-center space-x-2 py-4 px-4 mb-2">
                        <div tw="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                          {user?.image ? (
                            <Image src={user?.image} alt={user?.name || 'Avatar'} fill sizes="100vw" />
                          ) : (
                            <UserIcon tw="text-gray-400 w-6 h-6" />
                          )}
                        </div>
                        <div tw="flex flex-col truncate">
                          <span>{user?.name}</span>
                          <span tw="text-sm text-gray-500">
                            {user?.email}
                          </span>
                        </div>
                      </div>

                      <div tw="py-2">
                        {menuItems.map(
                          ({ label, href, onClick, icon: Icon }) => (
                            <div
                              key={label}
                              tw="px-2 last:border-t last:pt-2 last:mt-2"
                            >
                              <Menu.Item>
                                {href ? (
                                  (<Link
                                    href={href}
                                    tw="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">

                                    <Icon tw="w-5 h-5 flex-shrink-0 text-gray-500" />
                                    <span>{label}</span>

                                  </Link>)
                                ) : (
                                  <button
                                    tw="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                    onClick={onClick}
                                  >
                                    <Icon tw="w-5 h-5 flex-shrink-0 text-gray-500" />
                                    <span>{label}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          )
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <button
                  type="button"
                  onClick={openModal}
                  tw="ml-4 px-4 py-1 rounded-md bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white transition"
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main tw="flex-grow container mx-auto">
        <div tw="px-4 py-12">
          {typeof children === 'function' ? children(openModal) : children}
        </div>
      </main>

      <AuthModal show={showModal} onClose={closeModal} />
    </div>
  </>;
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;
