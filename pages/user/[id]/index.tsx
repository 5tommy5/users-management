import { User } from "@/models/user";
import { useRouter } from "next/router"

export const getServerSideProps = async (context) => {
  const id = context.query.hasOwnProperty('id') ? parseInt(context.query.id, 10) : 1;
  const res = await fetch('https://dummyjson.com/users/' + id);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: data
    }
  }
}

export const UserPage = (props : {user:User}) =>{
    const router = useRouter();

    return (
        <div className="w-full h-screen p-12 flex flex-col items-center gap-4 justify-start">
            <span className="w-full flex justify-start hover:cursor-pointer" onClick={router.back}>&#8592; Back</span>
            <div className="w-full h-1/2 flex gap-8 max-w-5xl mt-4 place-items-center border-2 border-white">
                <div>
                    <img src={props.user.image} />
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-2xl">{props.user.firstName} {props.user.lastName}</span>
                    <span>{props.user.age} years</span>
                    <span>{props.user.gender}</span>
                    <span>{props.user.email}</span>
                    <span>{props.user.phone}</span>
                </div>
            </div>
        </div>
    )
}

export default UserPage;