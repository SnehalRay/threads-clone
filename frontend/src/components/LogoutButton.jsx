import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { MdLogout } from "react-icons/md";
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';

export const LogoutButton = () => {

    const setUser = useSetRecoilState(userAtom);
    const toast = useToast();

    const handleLogout = async () => {
        try{
            localStorage.removeItem("user");
            const response = await fetch("/api/users/signout",{
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                }
            })

            const data = await response.json();

            if (response.ok){
                toast({
                    title: "Logout successful.",
                    description: data.message,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            }
            
            if (data.error){
                toast({
                    title: "An error occurred.",
                    description: data.error || "Something went wrong.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }

            
            setUser(null);

        }
        catch(error){
            console.log(error)
        }
    }
  
    
  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"lg"} variant='outline' onClick={handleLogout}>
        <MdLogout size="24px" />
    </Button>
  )
}
