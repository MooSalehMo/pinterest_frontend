import EmojiIcon from "../../icons/EmojIcon"
import StartSquerIcon from "../../icons/StarSquerIcon"
import EmojiPicker from 'emoji-picker-react'
import './WriteComment.css'
import { useState } from "react"
import apiRequest from "../../../utils/apiRequest";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const addComment = async (comment) => {
  const res = await apiRequest.post('/comments', comment)
  return res.data ;
};

function WriteComment ({id}){
  const [open, setOpen] = useState(false)
  const [desc, setDesc] = useState("")

  const handleOnEmojiClick = (emoji) => {
    setDesc(prev => prev + " " + emoji.emoji)
    setOpen(false)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey: ['comments', id]}) 
      setDesc("")
      setOpen(false)
    }
  })

  const handleSubmit = async(e) => {
    e.preventDefault()

    mutation.mutate({
      description: desc,
      pin: id
    })
  }

  return (
    <div className="write-comment">
        <h4 className="pragraph">What do you think ?</h4>
        <form onSubmit={handleSubmit} className="input-icons">
            <input onChange={ e => setDesc(e.target.value)} value={desc} name="description" className='input' type='text' placeholder='Do you want write any comment !' />
              <div className="icons">
                <div onClick={()=>setOpen(prev =>!prev)}>
                  <EmojiIcon />
                  {open && <EmojiPicker onEmojiClick={handleOnEmojiClick} className="emoji-picker"/>}
                </div>

            </div>
        </form>
    </div>
  )
}

export default WriteComment