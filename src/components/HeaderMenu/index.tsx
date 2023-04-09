import Link from 'next/link'
import Image from 'next/image'
import tw, { styled } from 'twin.macro'

export default function HeaderMenu() {
  return (
    <div tw="flex flex-row">
      <div tw="flex w-9/12">
        <Image
          src="/logos/logo.png"
          alt="LoLFans Logo"
          className=""
          width={50}
          height={50}
          priority
        />
      </div>
      <div tw="flex flex-row w-full justify-end items-center">
          <li tw="list-none pr-6">
            <Link href="/">Home</Link>
          </li>
          <li tw="list-none pr-6">
            <Link href="/players">Players</Link>
          </li>
          <li tw="list-none pr-6">
            <Link href="/champions">Champions</Link>
          </li>
          <li tw="list-none pr-6">
            <Link href="/image-generator">Image Generator</Link>
          </li>
          <li tw="list-none  pr-6">
            <Link href="/events">Events</Link>
          </li>
      </div>
    </div>
  )
}
