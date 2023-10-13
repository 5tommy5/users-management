import Paginator from "@/components/pagination";
import UserCard from "@/components/user-card";
import Autocomplete from "@/components/users-autocomplete";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users(){
    const router = useRouter();

    const [users, setUsers] = useState([]);

    function setCurrentPage(page:number){
        setUsers([]);
        router.push("/users/" + page);
    }
    function redirect(value:any){
        router.push('/user/' + value);
    }
    function toUserPage(id: number){
        router.push('/user/' + id);
    }

    const params = useParams();

    useEffect(() => {
        var skip:number;

        try{
            skip = (parseInt(params.page)-1)*10;
        }
        catch{
            return;
        }

        fetch("https://dummyjson.com/users?limit=10&skip=" + skip)
        .then( response => {
            return response.json()
        })
        .then( data =>{
            setUsers(data.users)
        });
    }, [params?.page]);

    console.log( params);

    const content = users?.length > 0 ? users.map( (user) => ( <UserCard redirect={toUserPage} key={user.id} user={user}/> )) : <div>Loading...</div>

    return (
        <div className="grid xl:grid-cols-5 2xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 gap-4 p-8">
            <div className="relative mb-[100px] w-full col-span-full">
                <div className="absolute">
                    <Autocomplete redirect={redirect}/>
                </div>
            </div>
            {content }
            <Paginator total={10} setCurrentPage={setCurrentPage}/>
        </div>
    );
}