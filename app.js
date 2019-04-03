 // Initialize Firebase
let config = {
    apiKey: "AIzaSyCzncwwC2DVTQfTsRyFIGWiRk1xaQ6vBe0",
    authDomain: "practice-7b421.firebaseapp.com",
    databaseURL: "https://practice-7b421.firebaseio.com",
    projectId: "practice-7b421",
    storageBucket: "practice-7b421.appspot.com",
    messagingSenderId: "391539722578"
  }
  firebase.initializeApp(config)

let db = firebase.firestore()

//Pulling info enter into form after hitting submit btn
document.querySelector('#submit').addEventListener('click', e => {
e.preventDefault()
let name = document.querySelector('#name').value
let destination = document.querySelector('#desti').value
let time = document.querySelector('#time').value
let minutes = document.querySelector('#minutes').value

let id = db.collection('users').doc().id

db.collection('users').doc(id).set({
    name: name,
    destination: destination,
    time: time,
    minutes: minutes,
})

document.querySelector('#name').value =''
document.querySelector('#desti').value =''
document.querySelector('#time').value =''
document.querySelector('#minutes').value =''
})

//This adds train name to Current Train Schedule 
db.collection('users').onSnapshot(({docs}) => {
    document.querySelector('#trainName').innerHTML = ''
    docs.forEach(doc => {
        let {name} = doc.data()
        let trainElem = document.createElement('div')
        trainElem.innerHTML = `
        <h3>${name}</h3>
        <hr>
        `
        document.querySelector('#trainName').append(trainElem)
    })
})

    //This adds destination to Current Train Schedule
    db.collection('users').onSnapshot(({docs}) => {
        document.querySelector('#destination').innerHTML = ''
        docs.forEach(doc => {
            let {destination} = doc.data()
            let destinationElem = document.createElement('div')
            destinationElem.innerHTML = `
            <h3>${destination}</h3>
            <hr>
            `
            document.querySelector('#destination').append(destinationElem)
        })
})
    //This adds destination to Current Train Schedule
    db.collection('users').onSnapshot(({docs}) => {
        document.querySelector('#frequency').innerHTML = ''
        docs.forEach(doc => {
            let {minutes} = doc.data()
            let minutesElem = document.createElement('div')
            minutesElem.innerHTML = `
            <h3>${minutes}</h3>
            <hr>
            `
            document.querySelector('#frequency').append(minutesElem)

        })
        })

        
    //Time for next arrival
    db.collection('users').onSnapshot(({docs}) => {
        document.querySelector('#nextTime').innerHTML = ''
        document.querySelector('#minutesAwy').innerHTML = ''
        docs.forEach(doc => {
            let {minutes: tFrequency} =doc.data()
            let {time: firstTime} = doc.data()
            
            //First time and pushing it back to ensure it comes before current time
            let firstTimeconverted = moment(firstTime, 'HH:mm').subtract(1, 'year')
            let currentTime = moment()
            
            //Difference between the times
            let diffTime = moment().diff(moment(firstTimeconverted), 'minutes')

            //Time apart / Time difference
            let timeRemainder = diffTime % tFrequency
            let tMinTillTrain = tFrequency - timeRemainder

            //Next train
            let nextTrain = moment().add(tMinTillTrain,'minutes')
            
            let nextArrivalElem = document.createElement('div')
            nextArrivalElem.innerHTML = `
            <h3>${moment(nextTrain).format('hh:mm')}</h3>
            <hr>
            `
            document.querySelector('#nextTime').append(nextArrivalElem)

            let tMinTillTrainElem = document.createElement('div')
            tMinTillTrainElem.innerHTML = `
            <h3>${tMinTillTrain}</h3>
            <hr>
            `
            document.querySelector('#minutesAwy').append(tMinTillTrainElem)

        })
})

