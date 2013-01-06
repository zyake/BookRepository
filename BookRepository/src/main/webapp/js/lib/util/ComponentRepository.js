function ComponentRepository() {
}

ComponentRepository.prototype.initialize = function() {
    this.repository = {};
    this.factory = {};
}

ComponentRepository.create = function() {
    var repository = new ComponentRepository();
    repository.initialize();

    return repository;
}

ComponentRepository.prototype.addFactory = function(key, factory) {
    var duplicatedKey = this.factory[key] != null;
    if ( duplicatedKey ) {
        throw new Error("duplicated key: key=" + key);
    }

    this.factory[key] = factory;
}

ComponentRepository.prototype.get = function(key, arg) {
    var existsComponent = this.repository[key] != null;
    if ( existsComponent ) {
        var component = this.repository[key];
        return component;
    }

    var targetFactory = this.factory[key];
    if ( targetFactory  == null ) {
        throw new Error("target factory not found: key=" + key);
    }
    var newComponent = targetFactory.call(this, arg);
    this.repository[key] = newComponent;

    return newComponent;
}