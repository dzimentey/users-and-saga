import React, {ChangeEvent} from "react";
import {UsersType} from "./users-reducer";

type FiltersType = {
    users: UsersType
    getPostsByUser: (id: number, newIsChecked: boolean) => void
}

export const Filters = React.memo(({users, getPostsByUser}: FiltersType) => {
    console.log('Filters')
    return <div className={'selectBlock'} >
        <div className={'selectTitle'} >Select users to view their posts</div>
        <div className={'selectBody'} >
            {users.map(u => {
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsChecked = e.currentTarget.checked
                    getPostsByUser(u.id, newIsChecked)
                }
                return (
                    <div key={u.id}>
                        <input type="checkbox" onChange={onChangeHandler} checked={u.isChecked}/>
                        {u.name}
                    </div>
                )
            })}
        </div>
    </div>
})