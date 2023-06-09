import "./EditProfile.css";

import { uploads } from "../../utils/config";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// components
import Message from "../../components/Message/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // gather user data from states

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    };

    if (bio) {
      userData.bio = bio;
    };

    if (password) {
      userData.password = password;
    };

    // build form data

    const formData = new FormData();
    const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    formData.append("user", userFormData)

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000)


  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    //update image state
    setProfileImage(image);

  };

  return (
    <div id="edit-profile" >
      <h2>Edite seu perfil.</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você.
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name} />
      )}
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Nome"
          onChange={({ target }) => setName(target.value)}
          value={name || ""} />
        <input type="Email" placeholder="Email" value={email || ""} disabled />
        <label>
          <span>Imagem de perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input type="text"
            onChange={({ target }) => setBio(target.value)}
            value={bio || ""} placeholder="Descrição do perfil" />
        </label>
        <label>
          <span>Quer alterar sua senha? </span>
          <input type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password || ""}
            placeholder="Digite sua nova senha" />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  )
}

export default EditProfile