document.addEventListener('DOMContentLoaded', function () {

    // ### CHECK BROWSER TYPE ###
    function checkBrowser() {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') !== -1) {
            if (ua.indexOf('chrome') > -1) {
                return 'chrome';
            } else {
                return 'other'
            }
        }
    }

    // ### END ###

    // ### HAMBURGER ###
    const hamburger = document.querySelector('.hamClick');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (checkBrowser() === 'chrome') {
            if (document.activeElement !== hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
    // ### END ###

    // ### MANIPULATING TABLE ###
    const addDomain = document.querySelector('.addDomain');
    const addWrapper = document.querySelector('.addWrapper');
    const addIcon = document.querySelector('.addWrapper .plus-icon');
    const domains = document.querySelector('.domainsList');

    addDomain.addEventListener('click', function () {
        addNewLine();
        deleteLineEvent();
        validateEvent();
        comboBoxEvent();
        addWrapper.parentNode.appendChild(addWrapper);
        addIcon.innerHTML = addIcon.innerHTML; // Reload SVG
    });

    function addNewLine() {
        const line = `
                        <tr class="row">
                            <td class="table-content__body__el">
                                <input class="input table-input" type="text">
                            </td>
                            <td class="table-content__body__el">
                                <input class="input table-input ipInput" type="text">
                                <svg class="icon check-icon">
                                    <use xlink:href="images/icons.svg#check_icon" />
                                </svg>
                            </td>
                            <td class="table-content__body__el">
                                <div class="input table-input combo-box">
                                    <span class="combo-box__val">No</span>
                                    <ul class="combo-box__list">
                                        <li class="combo-box__el" data-value="No">No</li>
                                        <li class="combo-box__el" data-value="Yes">Yes</li>
                                    </ul>
                                    <svg class="icon dropdown-icon">
                                        <use xlink:href="images/icons.svg#dropdown_icon" />
                                    </svg>
                                </div>
                                <svg class="icon lock-icon chosen">
                                    <use xlink:href="images/icons.svg#lock_icon" />
                                </svg>
                                <svg class="icon locked-icon">
                                    <use xlink:href="images/icons.svg#locked_icon" />
                                </svg>
                                <svg class="icon delete-icon deleteDomain">
                                    <use xlink:href="images/icons.svg#delete_icon" />
                                </svg>
                            </td>
                        </tr>
        `;
        domains.insertAdjacentHTML('beforeend', line);
        document.querySelector(`.domainsList .row:nth-last-child(1) .input`).focus()
    }

    function deleteLineEvent() {
        const deleteDomain = document.querySelectorAll('.deleteDomain');
        const lastDomain = deleteDomain[deleteDomain.length - 1];
        lastDomain.addEventListener('click', function () {
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        });
    }

    // For hardcoded element
    (function deleteLine() {
        const deleteDomain = document.querySelector('.deleteDomain');
        deleteDomain.addEventListener('click', function () {
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        })
    })();
    // ### END ###

    // ### IPS VALIDATION ###
    const ipInput = document.querySelector('.ipInput');

    function validateEvent() {
        const ipInput = document.querySelectorAll('.ipInput');
        const lastInput = ipInput[ipInput.length - 1];
        lastInput.addEventListener('blur', function () {
            validateIp(this.value, this);
        });
    }

    // For hardcoded element
    ipInput.addEventListener('blur', function () {
        validateIp(this.value, this);
    });
    validateIp(ipInput.value, ipInput);
    // ### END ##

    // ### COMBO BOX ###
    const comboBox = document.querySelector('.combo-box');
    const comboEl = document.querySelectorAll('.combo-box__el');

    function comboBoxEvent() {
        const comboBox = document.querySelectorAll('.combo-box');
        const lastBox = comboBox[comboBox.length - 1];
        const lastBoxEl = lastBox.querySelectorAll('.combo-box__el');
        toggleLock(lastBoxEl);
        lastBox.addEventListener('click', function () {
            this.classList.toggle('open');
        });
    }

    function toggleLock(DOMElem) {
        DOMElem.forEach(element => {
            element.addEventListener('click', function () {
                const value = this.dataset.value;
                const wrapper = this.parentNode.parentNode;
                const lockIcon = wrapper.parentNode.querySelector('.lock-icon');
                const lockedIcon = wrapper.parentNode.querySelector('.locked-icon');
                wrapper.querySelector('.combo-box__val').innerText = value;
                lockedIcon.classList.toggle('chosen');
                lockIcon.classList.toggle('chosen');
            })
        });
    }
    // For hardcoded element
    comboBox.addEventListener('click', function () {
        this.classList.toggle('open');
    });
    toggleLock(comboEl);
    // ### END ###

    // ### NEXT SECTION ###
    const buttonNext = document.querySelectorAll('.nextSection');
    const nodes = Array.prototype.slice.call( document.querySelectorAll('.section'));
    buttonNext.forEach(button => {
        button.addEventListener('click', function () {
            const index = nodes.indexOf(this.closest('section'));
            if (nodes[index + 1]) nodes[index + 1].classList.add('open');
        });
    });
    // ### END ###

    // ### NAMES VALIDATION ###
    const nameInputs = document.querySelectorAll('.nameValidation');
    nameInputs.forEach(input => {
        input.addEventListener('blur', function () {
            const value = this.value;
            this.parentNode.classList.remove('succeed', 'error'); //RESET ELEMENT
            if (validateName(value)) this.parentNode.classList.add('succeed');
            else this.parentNode.classList.add('error');
        })
    });
    // ### END ###

    // ### VALIDATE IP REGEX ###
    function validateIp(value, input){
        const regex = new RegExp("^(([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)\\.){3}([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)$");
        if(regex.test(value) === false){
            input.classList.remove('validate');
            return false;
        }
        if(value === " "){
            input.classList.remove('validate');
            return false;
        }
        input.classList.add('validate');
        return true;
    }
    // ### END ###

    // ### VALIDATE NAMES REGEX ###
    function validateName(value) {
        const regex = new RegExp("^[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]{3,20}$");
        if(regex.test(value) === false){
            return false;
        }
        if(value === " "){
            return false;
        }
        return true;
    }
    // ### END ###

});