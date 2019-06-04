import { IMeass } from "../js/IMeass";
import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index";

const uri: string = "https://restservicemeassurement20190604111254.azurewebsites.net/api/Meassurements/"

let divElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content")

let buttonforAllMeassurement: HTMLDivElement = <HTMLDivElement>document.getElementById("getAllMeassurement")

if (buttonforAllMeassurement !== null) {
    getAllMeassurement()
}

//Get funktionen
function getAllMeassurement(): void {
    axios.get<IMeass[]>(uri)
        .then(function (repsonse: AxiosResponse<IMeass[]>): void {
            console.log("sss")

            let olElement: HTMLOListElement = document.createElement('ol');

            let x: number = 0;

            repsonse.data.forEach((meass: IMeass) => {
                x++
                if (meass == null) {
                    olElement.appendChild(CreateLiElement("NULL element", "error", x));
                }
                else {
                    let tekst: string = "Id: " + meass.id + " Pressure: " + meass.pressure + " Tempareture: " + meass.humidity + "Humidity: " + meass.tempearture + "TimeStamp: " + meass.tim;
                    olElement.appendChild(CreateLiElement(tekst, "r1", meass.id));
                }
            });

            if (divElement.firstChild)
                divElement.removeChild(divElement.firstElementChild);

            divElement.appendChild(olElement);
        }
        )
        .catch(function (error: AxiosError): void {
            divElement.innerHTML = error.message;
        })
    // Resests the script every 1 sec
    setTimeout(getAllMeassurement, 1000)
}

function CreateLiElement(tekst:string, classAttribut:string, id: number) : HTMLLIElement{
    
    let newLiElement = document.createElement('li');
    let newText = document.createTextNode(tekst)
    
    newLiElement.setAttribute('class',classAttribut);
    newLiElement.setAttribute('id',id.toString());
    
    newLiElement.appendChild(newText);

    return newLiElement;
}