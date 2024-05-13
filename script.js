async function loadJSON(url) {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Erreur de chargement du fichier JSON");
    }
    return await response.json();
}

async function compareAndDelete(){
    try{
        const file1 = await loadJSON('./voieEmprise.json');
        const file2 = await loadJSON('./voie.json');

        console.log(file2);

        const privateStreet = file1.filter(rue => rue.statut && rue.statut.toLowerCase() === 'voie privée');

        const formatedData = file2.filter(rue => !privateStreet.some(rue2 => rue.l_longmin.toLowerCase() === rue2.typo_min.toLowerCase()))

        console.log(formatedData);
        downloadJSON(formatedData, 'formatedData.json');
    }
    catch (error) {
        console.error('Une erreur est survenue : ', error);
    }
}

function downloadJSON(data, filename){
    try{
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'})
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.toLowerCase();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    catch (error){
        console.error('Erreur lors du téléchargement du fichier JSON : ', error);
    }
}

compareAndDelete();