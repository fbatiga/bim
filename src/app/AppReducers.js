import LaunchReducer from '../view/launch/LaunchReducer';
import MessengerReducer from '../view/messenger/MessengerReducer';
import OverviewReducer from '../view/overview/OverviewReducer';
import AccountReducer from '../view/account/AccountReducer';
import CardReducer from '../view/card/CardReducer';
import ContactReducer from '../view/contact/ContactReducer';
import ContactDetailsReducer from '../view/contact-details/ContactDetailsReducer';
import TransferReducer from '../view/transfer/TransferReducer';

export default {
    launch : LaunchReducer,
    messenger : MessengerReducer,
    overview : OverviewReducer,
    account : AccountReducer,
    card : CardReducer,
    contact : ContactReducer,
    contactdetails : ContactDetailsReducer,
    transfer : TransferReducer
};
