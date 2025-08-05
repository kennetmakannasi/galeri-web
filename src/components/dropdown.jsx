import { Menu, MenuButton, MenuItems } from '@headlessui/react'

export default function Dropdown({buttonContent, dropdownContent}) {
  return (
    <div className="fixed top-24 w-52 text-right">
      <Menu>
        <MenuButton className="p-1 rounded-full hover:bg-dark-gray duration-150 transition-all">
          {buttonContent}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-lg border p-2 border-white bg-background-light-black text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
            {dropdownContent}          
        </MenuItems>
      </Menu>
    </div>
  )
}