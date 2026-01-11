import './CreatePage.css'
import IKImage from '../Image/Image';
import UploadIcon from '../icons/UploadIcon' 
import EditeIcon from '../icons/EditeIcon' 
import useAuthStore from '../../utils/authStore';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import useEditorStore from '../../utils/editorStore';
import apiRequest from '../../utils/apiRequest';
import Editor from '../editor/editor';
import { useMutation } from "@tanstack/react-query";


const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data;
};

const CreatePage = () => {
  const navigate = useNavigate()
  const formRef = useRef()
  const {currentUser} = useAuthStore()
  const {textOptions, canvasOptions, resetStore} = useEditorStore()
  const [file, setFile] = useState(null)
  const [previewImg, setpreviewImg] = useState({ url: "", width: 0, height: 0 })
  const [isEditing, setIsEditing] = useState(false)

  useEffect( () => {
    if(!currentUser)
      navigate('/auth');
  }, [navigate, currentUser])

  useEffect( () => {
    if (file) {
      const img = new Image()
      img.src =  URL.createObjectURL(file);
      img.onload = () => {
        setpreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height
        })
      }
    }
  },[file]);

    const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore();
      navigate(`/pin/${data._id}`);
    },
  });

  const handleSubmit = async() => {

    if(isEditing) {
      setIsEditing(false)
    } else {
      const formData = new FormData(formRef.current)
      formData.append('media', file)
      formData.append('textOptions', JSON.stringify(textOptions))
      formData.append('canvasOptions', JSON.stringify(canvasOptions))

      mutation.mutate(formData);
    }
  }


  return (
    <div className='create-page'>
      
      <div className="container">
        
        <div className="create-header">
          <h2 className='head'>{isEditing ? "Design your pin" : "Create Pin"} </h2>
          <button className="btn Publish" 
            onClick={handleSubmit}
          > 
            {isEditing ? "Done" : "Publish"}
          </button>
        </div>

        {isEditing ? 
          <Editor previewImg={previewImg}/> 
          : 
          <div className="create-body">
          { previewImg.url ? 
            <div className='preview'>
              <IKImage src={previewImg.url} alt="img" />
              <div className="edite-icon" onClick={() => setIsEditing(true)}>
                <EditeIcon />
              </div>
            </div> 
            : 
            <>
              <label htmlFor='file' className="upload">
                <i className='upload-icon'><UploadIcon /></i>
                <span className='desc'>Choose a file </span>
                <p className='upload-info'>We recommend using high quality .jpg less than 20 files less than 200 MB</p>
                <input hidden onChange={ e => setFile(e.target.files[0])} type='file' id='file' name='file' />
              </label>
            </>
            }

            <form className="form" ref={formRef}>

              <div className="title">
                <label htmlFor="title">Title</label>
                <input type='text' name="title" id="title" className="text" placeholder="Add a Title here"/>
              </div>
              <div className="desc">
                  <label htmlFor='description'>Description</label>
                  <textarea rows={6} type='text' name="description" id="description" className="desc" placeholder="Add a description here"/>
              </div>
              <div className="link">
                <label htmlFor='link'>Link:</label>
                <input type='text' name="link" id="link" className="link" placeholder='Add a link'/>
              </div>
              
              <div className="tags">
                <label htmlFor='tags'>Taged topics(0)</label>
                <input type='text' name="tags" id="tags" className="tags" placeholder='Search for a tag'/>
                <small>Don&apos;t worry , people wan&apos;t see your tags</small>
              </div>

            </form>

          </div>
        }
        
      </div>
    </div>
  )
}

export default CreatePage