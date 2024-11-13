'use client';

import { useState } from "react";
import { Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerList from "./SideDrawer";


export default function DrawerButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={handleClose}>
        <DrawerList />
      </Drawer>
    </div>
  );
}
