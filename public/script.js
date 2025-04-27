document.addEventListener("DOMContentLoaded", () => {
    const textArea = document.getElementById("text-to-summarise");
    const submitButton = document.getElementById("submit-button");
    const summarised_textarea = document.getElementById("summary");
    
    submitButton.disabled = true;
        
    function verifyTextLength(event) {
        const textarea = event.target;
        
        if (textarea.value.length > 200 && textarea.value.length < 100000) {
            submitButton.disabled = false;
        }
        else {
            submitButton.disabled = true;
        }
    }
    
    function submitData(event) {
        submitButton.classList.add("submit-btn--loading");

        summarised_textarea.value = "Generating summary...";
    
        const text_to_sum = textArea.value;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "text_to_sum" : text_to_sum
        });
    
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch("/api/summarise", requestOptions)
            .then(response => {
                if (!response.ok) {
                    console.log("nahi milali summary");
                    throw new Error("Summary nahi milali");
                }
                return response.json();
            })
            .then(data => {
                summarised_textarea.value = data.summary || "Summary kelich nahi wth";
            })
            .catch(error => {
                console.log("catch kela summary cha error : ", error);
                summarised_textarea.value = "console log check kar error asel tithe";
            })
            .finally(() => {
                submitButton.classList.remove("submit-btn--loading");
            });
    }
    
    textArea.addEventListener("input", verifyTextLength);
    submitButton.addEventListener("click", submitData);

});