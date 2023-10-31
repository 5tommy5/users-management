import {User} from "@/models/user";

export const UserCard = (props : {user:User, redirect}) => {
    const redirectToUserPage = () => {
        props.redirect(props.user.id);
    }
    return (
        <div onClick={redirectToUserPage} className="margin-2 border-2 border-slate-300 rounded-lg p-4 
        flex flex-col align-top justify-center shadow
        hover:border-0 hover:cursor-pointer hover:shadow-xl hover:shadow-slate-100">
            <img src={props.user.image}/>
            <div className="flex justify-center mt-2">
                {props.user.firstName} {props.user.lastName}
            </div>
        </div>
    )
}