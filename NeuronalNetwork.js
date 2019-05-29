class NeuronalNetwork {
  constructor(inputShape, hiddenNodes, outputNodes) {
    this.inputShape = inputShape;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({
        units: this.hiddenNodes,
        inputShape: [this.inputShape],
        activation: 'sigmoid'
      })
    );
    this.model.add(
      tf.layers.dense({ units: this.outputNodes, activation: 'softmax' })
    );
  }

  setWeights(weights) {
    this.model.setWeights(weights);
  }

  setWeightsMutated(weights) {
    const rate = 0.1;
    // console.log(weights);
    // noLoop();

    // const weights = this.model.getWeights();
    tf.tidy(() => {
      const mutatedWeights = [];
      for (let i = 0; i < weights.length; i++) {
        const tensor = weights[i];
        const shape = weights[i].shape;
        const values = tensor.dataSync().slice();

        for (let j = 0; j < values.length; j++) {
          if (random(1) < rate) {
            let w = values[j];
            values[j] = w + randomGaussian();
          }
        }

        const newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }

      this.model.setWeights(mutatedWeights);
    });

    // weights.dispose();
  }

  clone() {
    const weights = [];

    // tf.tidy(() => {
    for (let weight of this.model.getWeights()) {
      weights.push(weight.clone());
    }
    // });

    // console.log(weights);

    return weights;
  }

  predict(inputs) {
    let outputs;

    tf.tidy(() => {
      const inputTensor = tf.tensor2d(inputs, [1, inputs.length]);
      const outputTensor = this.model.predict(inputTensor);
      outputs = outputTensor.dataSync();
    });

    return outputs;
  }
}
