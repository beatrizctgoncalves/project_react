import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#274e81e1',
    },
    div: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    avatarSign: {
        margin: theme.spacing(1),
        backgroundColor: '#274e81e1',
    },
    cardGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(4),
    },
    masterHead: {
        paddingTop: 400,
        paddingBottom: 150,
        background: 'linear-gradient(to bottom, rgba(66, 80, 92, 0.8) 0%, rgba(97, 106, 129, 0.8) 100%), url("https://image.freepik.com/free-vector/young-man-study-computer-online-learning-concept_186332-336.jpg")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'contain'
    },
    section: {
        paddingTop: 100,
        paddingBottom: 100,
        background: '#274e81e1',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'contain'
    },
    title: {
        color: '#fff',
        fontFamily: [
            "Merriweather Sans",
            '-apple-system',
            'BlinkMacSystemFont',
            "Segoe UI",
            'Roboto',
            "Helvetica Neue",
            'Arial',
            "Noto Sans",
            'sans-serif',
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
        ].join(','),
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#fff',
        fontFamily: [
            "Merriweather Sans",
            '-apple-system',
            'BlinkMacSystemFont',
            "Segoe UI",
            'Roboto',
            "Helvetica Neue",
            'Arial',
            "Noto Sans",
            'sans-serif',
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
        ].join(','),
    },
    divider: {
        backgroundColor: '#fff',
        height: '2rem',
        maxWidth: '3.5rem',
        margin: {
            marginTop: '1.5rem',
            marginRight: 'auto',
            marginBottom: '1.5rem',
            marginLeft: 'auto'
        },
        opacity: 1
    },
    listItem: {
        padding: theme.spacing(0, 2),
    }
}));