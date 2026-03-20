import React from 'react'
import MacWindow from './MacWindow'
import githubData from "../../assets/github.json"
import "./Github.scss"

const GitCard = ({data = {id:1, image:"", title:"", description:"", tags:[], repoLink:"",demoLink:""}}) => {
    return <div className="card">
        <img src={data.image} alt="" />
        <h1>{data.title}</h1>
        <p>{data.description}</p>

        <div className="tags">
            {data.tags.map(tag=><p className='tag'>{tag}</p>)}
        </div>

        <div className="urls">
            <a href={data.repoLink}>Repository</a>
            <a href={data.demoLink}></a>
        </div>
    </div>
}

const Github = ({ onClose, onMinimize, onMaximize, isMaximized}) => {
  return (
    <MacWindow title="Projects — GitHub" 
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            isMaximized={isMaximized}>
        <div className="cards">
            {githubData.map((project, index) => {
                // Use project.id if it exists, otherwise fallback to index
                return <GitCard key={project.id || index} data={project} />
            })}
        </div>
    </MacWindow>
  )
}

export default Github