import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PostPanel } from '../PostPanel/PostPanel';
import { Input } from '../../../../ui';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../store/actions';
import { useServerRequest } from '../../../../hooks';

export const PostForm = ({ post: { id, title, imageUrl, content, publishedAt } }) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onImageChange = ({ target }) => setImageUrlValue(target.value);
  const onTitleChange = ({ target }) => setTitleValue(target.value);

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then(({ id }) => navigate(`/post/${id}`));
  };

  return (
    <div className="post-content">
      <Input
        onChange={onImageChange}
        value={imageUrlValue}
        placeholder="Изображение..."
      />
      <Input onChange={onTitleChange} value={titleValue} placeholder="Заголовок..." />
      <PostPanel
        id={id}
        publishedAt={publishedAt}
        editButton={
          <i
            className="fa fa-floppy-o cursor-pointer"
            aria-hidden="true"
            onClick={onSave}
          ></i>
        }
      />
      <div
        ref={contentRef}
        className="post-text-editing"
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
    </div>
  );
};
