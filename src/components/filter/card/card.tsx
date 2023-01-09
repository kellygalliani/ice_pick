import React from "react";
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { iSentences } from "../../../types/types";
import { StyledCard } from "./styledComponents";

import { useModal } from "../../../hooks/useModal";
import { useSentece } from "../../../hooks/useSentence";
import EditSentenceForm from "../../editSentenceForm/EditSentenceForm";


type tTypeCard= "created" | "favorite"

interface iMiniCard{
    type:tTypeCard,
    sentence: iSentences
}
const MiniCard = ({type, sentence }:iMiniCard) => {
    const { showModal } = useModal()
    const { likeSentence } = useSentece()
    
    return(
        <StyledCard key={sentence.id}>
            <div>
                <p>{sentence.text}</p>
            </div>
            <div>
                {type === "created"? (
                    <>
                        <MdOutlineModeEditOutline onClick={() => showModal(<EditSentenceForm sentence={sentence} />)}/>
                        {/* Faltando os content do modal de Delete */}
                        <FiTrash2 onClick={() => showModal(<EditSentenceForm sentence={sentence} />)}/>
                    </>
                ):(
                    <>
                        {sentence.liked?(
                            <AiTwotoneStar onClick={()=> likeSentence(sentence)}/>
                        ):(
                            <AiOutlineStar onClick={()=> likeSentence(sentence)}/>
                        )}
                        <span>{sentence.like}</span>
                    </>
                )}
            </div>
        </StyledCard>
    )
}
export default MiniCard;