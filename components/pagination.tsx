import { useState } from "react";

export default function Paginator(props:any){
    const total:number = props.total;
    const [current, setCurrent] = useState(1);

    const pages = Array.from({length: total}, (_, i) => i + 1);

    const setPage = (page: number) => {
        console.log(page);
        setCurrent(page);
        props.setCurrentPage(page);
    }

    return (
        <div className="flex gap-1 mx-auto w-full col-span-full justify-center">
            {pages.map(page => (
                <div key={page} onClick={setPage.bind(this, page)} 
                    className="border-2 border-slate-200 px-3 hover:cursor-pointer hover:shadow-xl hover:shadow-slate-100">
                    <span className={page==current? 'underline underline-offset-2': 'no-underline'}>{page}</span>
                </div>
            ))}
        </div>
    )
}