import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentLoadingContext } from "../contexts/CurrentLoadingContext";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { register, login, checkToken } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false); // хук открытия формы аватара
    const [isEditProfilePopupOpen, setEditProfileState] = useState(false); // хук открытия формы редактирования
    const [isAddPlacePopupOpen, setAddPlaceState] = useState(false); // хук открытия формы добавления карты
    const [isImagePopupOpen, setImagePopupOpen] = useState(false); // хук проброса выбранной карточки
    const [selectedCard, setSelectedCard] = useState({}); // хук открытия выбранной карточки в попап
    const [currentUser, setCurrentUser] = useState({}); // хук запись данных пользователя
    const [cards, setCards] = useState([]); // хук запись данных карточек
    const [isLoading, setLoading] = useState(false); // хук прелоадера
    const [isConfirmPopupOpen, setConfirmState] = useState(false); // хук открытия формы подтверждения удаления
    const [deletedCard, setDeletedCard] = useState({}); //хук проброса удаляемой карточки
    const [loggedIn, setLoggedIn] = useState(false); //хук для управления авторизацией
    const [userEmail, setUserEmail] = useState({ email: "" }); // хук для отображения email
    const [isRegisterPopupOpen, setRegisterState] = useState(false); // хук для отображения уведомления после регистрации
    const [isRegisterText, setRegisterText] = useState(""); // хук для отображения текста регистрации
    const [isRegisterStatus, setRegisterStatus] = useState(false); // хук для отображения текста регистрации
    const navigate = useNavigate(); // редирект

    useEffect(() => {
        if(loggedIn) {
            Promise.all([api.getApiInfo(), api.getApiCard()])
                .then((dataList) => {
                    const [dataInfo, dataCards] = dataList; // диструктурируем полученный массив данных
                    // запись данных профиля и карточки в их стэйты
                    setCurrentUser(dataInfo);
                    setCards(dataCards);
                })
                .catch((err) => alert(err));
        }
    }, [loggedIn]);

    // Обработчики стейтов
    const handleEditAvatarClick = () => {
        setEditAvatarState(true);
    };

    const handleEditProfileClick = () => {
        setEditProfileState(true);
    };

    const handleAddPlaceClick = () => {
        setAddPlaceState(true);
    };

    const closeAllPopups = () => {
        setEditAvatarState(false);
        setEditProfileState(false);
        setAddPlaceState(false);
        setImagePopupOpen(false);
        setConfirmState(false);
        setRegisterState(false);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupOpen(true);
    };

    // Обработчик подтверждения на удаление
    const handleCardDelete = (card) => {
        setConfirmState(true);
        setDeletedCard(card);
    };

    // Обработчик удаления после подтверждения
    const handleConfirmSubmit = () => {
        // Отправляем запрос в API после подтверждения и получаем обновлённые данные карточки
        api
            .deleteApiCard(deletedCard._id)
            .then((newCard) => {
                setCards((state) => state.filter((c) => c._id !== deletedCard._id));
                closeAllPopups();
            })
            .catch((err) => alert(err));
    };

    // Обработчик лайков
    const handleCardLike = (card) => {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => alert(err));
    };

    //обработчик обновления и закрытия формы редактирования
    const handleUpdateUser = (user) => {
        setLoading(true);
        api
            .setApiInfo(user)
            .then((dataInfo) => {
                setCurrentUser(dataInfo);
                closeAllPopups();
            })
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false);
            });
    };

    //обработчик обновления и закрытия формы аватара
    const handleUpdateAvatar = (avatar) => {
        setLoading(true);
        api
            .setApiAvatar(avatar)
            .then((dataInfo) => {
                setCurrentUser(dataInfo);
                closeAllPopups();
            })
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false);
            });
    };

    //обработчик добавления карточки
    const handleAddPlaceSubmit = (card) => {
        setLoading(true);
        api
            .setApiNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false);
            });
    };

    //обработчик стэйта авторизации
    const handleLoggedIn = (email) => {
        setLoggedIn(true);
        setUserEmail({ email: email }); // email в хедере после входа
    };

    //обработчик регистрации
    const handleRegister = (formValue) => {
        setLoading(true);
        const { email, password } = formValue;

        register(email, password)
            .then((data) => {
                setRegisterState(true);
                setRegisterStatus(true);
                setRegisterText("Вы успешно зарегистрировались!");
                navigate("/sign-in", { replace: true });
            })
            .catch((err) => {
                setRegisterState(true);
                setRegisterText("Что-то пошло не так!\n" + "Попробуйте ещё раз.");
                setRegisterStatus(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    //обработчик авторизации
    const handleLogin = (formValue) => {
        setLoading(true);
        const { email, password } = formValue;

        login(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    handleLoggedIn(email);
                    navigate("/main", { replace: true });
                }
            })
            .catch((err) => alert(err))
            .finally(() => {
                setLoading(false);
            });
    };

    //обработчик проверки токена
    const handleCheckToken = () => {
        const token = localStorage.getItem("token"); // получаем сохранённый токен

        if (token) {
            checkToken(token)
                .then((res) => {
                    handleLoggedIn(res.data.email);
                    navigate("/main", { replace: true });
                })
                .catch((err) => alert(err));
        }
    };

    // проверка токена после перезагрузки
    useEffect(() => {
        handleCheckToken();
    }, []);

    const handleSignout = () => {
        localStorage.removeItem("token");
        navigate("/sign-in", { replace: true });
        setLoggedIn(false);
    };

    return (
        <div className="page">
            <div className="page__container">
                <CurrentUserContext.Provider value={currentUser}>
                    {" "}
                    {/*внедряем данные в контекст CurrentUserContext*/}
                    <Header
                        loggedIn={loggedIn}
                        email={userEmail}
                        logOut={handleSignout}
                    />
                    <Routes>
                        <Route path="/sign-in" element={<Login onSubmit={handleLogin} isLoading={isLoading}/>} />
                        <Route path="/sign-up" element={<Register onSubmit={handleRegister} isLoading={isLoading}/>} />
                        <Route
                            path="/"
                            element={
                                loggedIn ? <Navigate to="/main" /> : <Navigate to="/sign-in" />
                            }
                        />

                        <Route
                            path="/main"
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    element={Main}
                                    cards={cards}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                            }
                        />
                    </Routes>
                    <Footer />
                    <CurrentLoadingContext.Provider value={isLoading}>
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}
                        />
                        <EditAvatarPopup
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                            onUpdateAvatar={handleUpdateAvatar}
                        />
                        <AddPlacePopup
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                            onAddPlace={handleAddPlaceSubmit}
                        />
                    </CurrentLoadingContext.Provider>
                    <ConfirmPopup
                        isOpen={isConfirmPopupOpen}
                        onClose={closeAllPopups}
                        onConfirmDelete={handleConfirmSubmit}
                    />
                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />
                    <InfoTooltip
                        title={isRegisterText}
                        name={"registerAlert"}
                        isOpen={isRegisterPopupOpen}
                        onClose={closeAllPopups}
                        status={isRegisterStatus}
                    />
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
}

export default App;
