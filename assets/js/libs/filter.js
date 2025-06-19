/////////////////////////////////////////////////
/////////////// АКТУАЛЬНЫЙ ФИЛЬТР ///////////////
/////////////////////////////////////////////////

var filter = {
    idModel: 0,
    idEquipment: 0,
    idEngine: 0,
    showMoreBy: 3,
    showMoreClass: 'd-none',
    cache: {
        modelFilter: null,
        equipmentFilter: null,
        engineFilter: null,
    },

    init: function () {
        this.cardsContainer = $('.js--cards');
        this.cards = $('.js--card');

        this.modelFilter = $('.js--model');
        this.equipmentFilter = $('.js--equipment');
        this.engineFilter = $('.js--engine');

        this.cache.modelFilter = this.modelFilter.find('option');
        this.cache.equipmentFilter = this.equipmentFilter.find('option');
        this.cache.engineFilter = this.engineFilter.find('option');

        this.showMore = $('.js--show-more');

        this.setShowMoreListener();

        this.setModelListener();
        this.setEquipmentListener();
        this.setEngineListener();

        // this.resetEquipmentFilter();
        // this.getEquipmetOptionsByModel();
        // this.showCardsByFilter();
    },

    all: function () {
        console.log(this.idModel, this.idEquipment, this.idEngine);
    },

    setShowMoreListener: function () {
        this.showMore.click(function (e) {
            e.preventDefault();
            filter.showMoreEvent();
        });
    },

    setModelListener: function () {
        this.modelFilter.change(function (e) {
            e.preventDefault();
            filter.idModel = $(this).val();
            filter.resetEquipmentFilter();
            filter.getEquipmetOptionsByModel();
            filter.showCardsByFilter();
            filter.all();
        });
    },

    setEquipmentListener: function () {
        this.equipmentFilter.change(function (e) {
            e.preventDefault();
            filter.idEquipment = $(this).val();
            filter.showCardsByFilter();
            filter.all();
        });
    },

    setEngineListener: function () {
        this.engineFilter.change(function (e) {
            e.preventDefault();
            filter.idEngine = $(this).val();
            filter.all();
        });
    },

    resetEquipmentFilter: function () {
        this.equipmentFilter.html(this.cache.equipmentFilter);
        this.equipmentFilter.val(0);
        this.idEquipment = 0;
    },

    getEquipmetOptionsByModel: function () {
        filter.equipmentFilter.find('option')[0].dataset.model = filter.idModel;
        filter.equipmentFilter.find('option[data-model!="' + filter.idModel + '"]').remove();
    },

    hideShowMoreBtn() {
        if (document.querySelectorAll('.filtered-show').length - document.querySelectorAll('.showmore-show').length === 0) {
            document.querySelector('.js--show-more')?.classList.add('hidden');
        } else {
            document.querySelector('.js--show-more')?.classList.remove('hidden');
        }
    },

    showCardsByFilter() {
        filter.cards.removeClass('filtered-show').removeClass('showmore-hide').removeClass('filtered-hide').removeClass('showmore-show').addClass('filtered-show').addClass('showmore-hide');
        if (filter.idModel)
            filter.cardsContainer.find('.js--card[data-model!="' + filter.idModel + '"]').removeClass('filtered-show').removeClass('showmore-show').addClass('filtered-hide');
        if (filter.idEquipment)
            filter.cardsContainer.find('.js--card[data-equipment!="' + filter.idEquipment + '"]').removeClass('filtered-show').removeClass('showmore-show').addClass('filtered-hide');

        filter.showMoreEvent();
        this.hideShowMoreBtn();
    },

    showMoreEvent: function() {
        filter.cardsContainer.find('.filtered-show.showmore-hide').each(function (index, value) {
            if (index < 3)
                $(this).removeClass('showmore-hide').addClass('showmore-show');
        });

        this.hideShowMoreBtn();
    }
}

filter.init();