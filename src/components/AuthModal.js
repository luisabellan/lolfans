import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import tw, { styled } from "twin.macro";
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import { Dialog, Transition } from '@headlessui/react';
import { SparklesIcon, MailOpenIcon, XIcon } from '@heroicons/react/outline';
import Input from './Input';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('This field is required'),
});

const Confirm = ({ show = false, email = '' }) => (
  <Transition appear show={show} as={Fragment}>
    <div tw="fixed inset-0 z-50">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div tw="fixed inset-0 bg-white" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div tw="flex items-center justify-center h-full p-8">
          <div tw="overflow-hidden transition-all transform">
            <h3 tw="text-center text-lg font-medium leading-6">
              <div tw="flex flex-col justify-center items-center space-y-4">
                <MailOpenIcon tw="w-12 h-12 shrink-0 text-red-500" />
              </div>
              <p tw="text-2xl font-semibold mt-2">Confirm your email</p>
            </h3>

            <p tw="text-lg text-center mt-4">
              We emailed a magic link to <strong>{email ?? ''}</strong>.
              <br />
              Check your inbox and click the link in the email to login or sign
              up.
            </p>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Transition>
);

const AuthModal = ({ show = false, onClose = () => null }) => {
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const signInWithEmail = async ({ email }) => {
    let toastId;
    try {
      toastId = toast.loading('Loading...');
      setDisabled(true);
      // Perform sign in
      const { error } = await signIn('email', {
        redirect: false,
        callbackUrl: window.location.href,
        email,
      });
      // Something went wrong
      if (error) {
        throw new Error(error);
      }
      setConfirm(true);
      toast.dismiss(toastId);
    } catch (err) {
      toast.error('Unable to sign in', { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

  const signInWithGoogle = () => {
    toast.loading('Redirecting...');
    setDisabled(true);
    // Perform sign in
    signIn('google', {
      callbackUrl: window.location.href,
    });
  };

  const closeModal = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Reset modal
  useEffect(() => {
    if (!show) {
      // Wait for 200ms for aniamtion to finish
      setTimeout(() => {
        setDisabled(false);
        setConfirm(false);
        setShowSignIn(false);
      }, 200);
    }
  }, [show]);

  // Remove pending toasts if any
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        tw="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay tw="fixed inset-0 bg-black opacity-75" />

        <div tw="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay tw="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            tw="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div tw="inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:rounded-md max-w-md relative">
              {/* Close icon */}
              <button
                onClick={closeModal}
                tw="absolute top-2 right-2 shrink-0 p-1 rounded-md hover:bg-gray-100 transition focus:outline-none"
              >
                <XIcon tw="w-5 h-5" />
              </button>

              <div tw="py-12">
                <div tw="px-4 sm:px-12">
                  <div tw="flex justify-center">
                    <Link href="/" tw="flex items-center space-x-1">
                      <>
                      <SparklesIcon tw="shrink-0 w-8 h-8 text-red-500" />
                      <span tw="text-xl font-semibold tracking-wide">
                        Supa<span tw="text-red-500">Vacation</span>
                      </span>
                        </>
                    </Link>
                  </div>

                  <Dialog.Title
                    as="h3"
                    tw="mt-6 font-bold text-lg sm:text-2xl text-center"
                  >
                    {showSignIn ? 'Welcome back!' : 'Create your account'}
                  </Dialog.Title>

                  {!showSignIn ? (
                    <Dialog.Description tw="mt-2 text-gray-500 text-base text-center">
                      Please create an account to list your homes and bookmark
                      your favorite ones.
                    </Dialog.Description>
                  ) : null}

                  <div tw="mt-10">
                    {/* Sign with Google */}
                    <button
                      disabled={disabled}
                      onClick={() => signInWithGoogle()}
                      tw="h-[46px] w-full mx-auto border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
                    >
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={32}
                        height={32}
                      />
                      <span>Sign {showSignIn ? 'in' : 'up'} with Google</span>
                    </button>

                    {/* Sign with email */}
                    <Formik
                      initialValues={{ email: '' }}
                      validationSchema={SignInSchema}
                      validateOnBlur={false}
                      onSubmit={signInWithEmail}
                    >
                      {({ isSubmitting, isValid, values, resetForm }) => (
                        <Form tw="mt-4">
                          <Input
                            name="email"
                            type="email"
                            placeholder="elon@spacex.com"
                            disabled={disabled}
                            spellCheck={false}
                          />

                          <button
                            type="submit"
                            disabled={disabled || !isValid}
                            tw="mt-6 w-full bg-red-600 text-white py-2 px-8 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
                          >
                            {isSubmitting
                              ? 'Loading...'
                              : `Sign ${showSignIn ? 'in' : 'up'}`}
                          </button>

                          <p tw="mt-2 text-center text-sm text-gray-500">
                            {showSignIn ? (
                              <>
                                Don&apos;t have an account yet?{' '}
                                <button
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    setShowSignIn(false);
                                    resetForm();
                                  }}
                                  tw="underline underline-offset-1 font-semibold text-red-500 hover:text-red-600 disabled:hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Sign up
                                </button>
                                .
                              </>
                            ) : (
                              <>
                                Already have an account?{' '}
                                <button
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    setShowSignIn(true);
                                    resetForm();
                                  }}
                                  tw="underline underline-offset-1 font-semibold text-red-500 hover:text-red-600 disabled:hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Log in
                                </button>
                                .
                              </>
                            )}
                          </p>

                          <Confirm
                            show={showConfirm}
                            email={values?.email ?? ''}
                          />
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

AuthModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AuthModal;
