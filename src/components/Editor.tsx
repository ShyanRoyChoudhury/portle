import React, { useState, useCallback, useEffect, } from "react";
import { Editor, convertToRaw, convertFromRaw, EditorState, RichUtils, DraftHandleValue, ContentState} from "draft-js";
import { useRecoilValue } from "recoil";
import { btnAtom } from "../../store/atom";

const LocalEditor: React.FC = () =>{
    
    const defaultContent = `Hello, this is default content, \nPress # for header one, \nPress * for Bold, \nPress _ for underscrore, \nPress ^ for Red`;

    const [ editorState, setEditorState ] = useState(()=>{
        const savedContent = localStorage.getItem("editorContent");
        if(savedContent){
            console.log('inside')
            return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
        }

        const text = EditorState.createWithContent(ContentState.createFromText(defaultContent));
        return text

    })

    const btnState = useRecoilValue(btnAtom)
    useEffect(()=>{
        if(btnState === true){
        const currentContent = editorState.getCurrentContent()
        const rawContentState = convertToRaw(currentContent);
        const strifiedContent = JSON.stringify(rawContentState)

        const texts = rawContentState.blocks.map((block) => block.text).join('');

        console.log(texts);
        if(texts.trim() !== ''){
            localStorage.setItem('editorContent',strifiedContent)
        }else{

            localStorage.removeItem('editorContent')
        }   
            
            // const selection = editorState.getSelection();
            
            // const block = currentContent.getBlockForKey(selection.getStartKey());
            
            // const text = block.getText();
            //console.log(text)
        }
    },[editorState, btnState])

    

    const handleBeforeInput = (char:string, editorState: EditorState): DraftHandleValue => {
        const currentContent = editorState.getCurrentContent();
        const rawContentState = convertToRaw(currentContent);
        const blocks = rawContentState.blocks


        for (const block of blocks){
            const text = block.text;
            console.log(text);
            if (char === '#' ) {
                setEditorState((newState:EditorState)=>RichUtils.toggleBlockType(newState, 'header-one'));
                return 'handled';
            }
            if (char === '_') {
                setEditorState((newState:EditorState)=>RichUtils.toggleInlineStyle(newState, 'UNDERLINE'))
                return 'handled'
            }
            
            if(char === '*'){
                setEditorState((newState:EditorState)=>RichUtils.toggleInlineStyle(newState, 'BOLD'));
                return 'handled';
            }
            
            // if(char === '*' && text.startsWith('** '))
            if (char === '^') {
                onChange(RichUtils.toggleInlineStyle(editorState, 'COLOR_RED'));
                return 'handled';
              }
        }
        return 'not-handled';
        
    }

    const onChange = useCallback((newEditorState:EditorState)=>{
        setEditorState(newEditorState)
    },[])
    
    // const editorRef = useRef<Editor | null>(null);
    // const focusEditor = () => {
    //     if(editorRef.current){
    //         editorRef.current.focus()
    //     }
    // }
    
    return(
        <div className="h-full">
            <Editor 
            placeholder="write here"
            onChange={onChange}
            editorState={editorState}
            handleBeforeInput={handleBeforeInput}
            />
        </div>)
}

export default LocalEditor;